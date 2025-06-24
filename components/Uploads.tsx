"use client";

import React, { useState, useRef, useCallback } from 'react';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { Image as ImageIcon, FileText, UploadCloud, XCircle, CheckCircle, Loader2 } from 'lucide-react';

// Assumindo que seu __app_id está disponível globalmente como no seu service
declare const __app_id: string;

// Inicialização do Firebase Storage (Ajuste conforme sua estrutura de inicialização)
// Se você tem um 'app' já inicializado globalmente ou em um arquivo, importe-o.
// Exemplo: import { app } from '@/firebaseConfig';
// const storage = getStorage(app);
// Para este exemplo, vou simular a inicialização e o acesso ao __app_id
const getFirebaseStorage = () => {
    // Isso é um placeholder. Na sua aplicação real, você deve obter a instância do app Firebase
    // que já foi inicializada, ex: import { app } from '@/firebaseConfig';
    // const storage = getStorage(app);
    // Para rodar no sandbox, vamos criar uma instância dummy ou assumir que o ambiente já fornece
    try {
        const firebaseApp = (window as any).firebaseApp; // Assume que o app Firebase está na window para o sandbox
        if (firebaseApp) {
            return getStorage(firebaseApp);
        }
    } catch (e) {
        console.error("Firebase app not globally available. Please ensure Firebase is initialized and exposed or imported correctly.", e);
    }
    // Fallback: se não conseguir obter a instância real, retorna null
    return null;
};


// =========================================================================
// FUNÇÃO AUXILIAR DE REDIMENSIONAMENTO DE IMAGEM (PARA ImageUploader)
// =========================================================================
interface ResizeOptions {
    maxWidth?: number;
    maxHeight?: number;
    quality?: number; // 0 to 1, default 0.92
    fileType?: string; // e.g., 'image/jpeg', 'image/png'
}

const resizeImage = (file: File, options: ResizeOptions): Promise<Blob> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (event) => {
            const img = new Image();
            img.src = event.target?.result as string;
            img.onload = () => {
                const canvas = document.createElement('canvas');
                let width = img.width;
                let height = img.height;

                if (options.maxWidth && width > options.maxWidth) {
                    height = height * (options.maxWidth / width);
                    width = options.maxWidth;
                }

                if (options.maxHeight && height > options.maxHeight) {
                    width = width * (options.maxHeight / height);
                    height = options.maxHeight;
                }
                
                canvas.width = width;
                canvas.height = height;

                const ctx = canvas.getContext('2d');
                if (!ctx) {
                    return reject(new Error("Não foi possível obter o contexto do canvas."));
                }
                ctx.drawImage(img, 0, 0, width, height);

                const outputFileType = options.fileType || file.type;
                const outputQuality = options.quality || 0.92;

                canvas.toBlob((blob) => {
                    if (blob) {
                        resolve(blob);
                    } else {
                        reject(new Error("Erro ao redimensionar a imagem para Blob."));
                    }
                }, outputFileType, outputQuality);
            };
            img.onerror = (e) => reject(new Error("Erro ao carregar a imagem para redimensionamento."));
        };
        reader.onerror = (e) => reject(new Error("Erro ao ler o arquivo de imagem."));
    });
};


// =========================================================================
// 1. COMPONENTE ImageUploader
// =========================================================================
interface ImageUploaderProps {
    id: string;
    labelText: string;
    storagePath: string; // Ex: 'profile_pictures', 'camp_photos'
    onUploadSuccess: (downloadURL: string) => void;
    onUploadError: (error: string) => void;
    maxSize?: { width: number; height: number; quality?: number; fileType?: string; }; // Para redimensionamento
    currentImageUrl?: string | null; // URL da imagem atual para exibição
    className?: string; // Classes Tailwind para o container
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({
    id,
    labelText,
    storagePath,
    onUploadSuccess,
    onUploadError,
    maxSize,
    currentImageUrl,
    className
}) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(currentImageUrl || null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Sincroniza a previewUrl se a currentImageUrl mudar externamente
    React.useEffect(() => {
        setPreviewUrl(currentImageUrl || null);
    }, [currentImageUrl]);


    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        setLoading(true);
        setError(null);
        setPreviewUrl(URL.createObjectURL(file)); // Exibe prévia imediata

        try {
            const storage = getFirebaseStorage();
            if (!storage) {
                throw new Error("Firebase Storage não inicializado. Verifique sua configuração do Firebase.");
            }

            let fileToUpload: Blob = file;
            let fileName = file.name;

            // Redimensionar imagem se maxSize for fornecido
            if (maxSize) {
                console.log("Iniciando redimensionamento de imagem...");
                const resizedBlob = await resizeImage(file, {
                    maxWidth: maxSize.width,
                    maxHeight: maxSize.height,
                    quality: maxSize.quality,
                    fileType: maxSize.fileType || file.type // Usa o tipo original ou especificado
                });
                fileToUpload = resizedBlob;
                // Ajusta o nome do arquivo, ex: "foto.jpg" -> "foto_resized.jpg"
                fileName = `${file.name.split('.').slice(0, -1).join('.')}_resized.${file.type.split('/')[1] || 'jpeg'}`;
                console.log("Imagem redimensionada para:", fileToUpload.size, "bytes.");
            }

            // Nome único para o arquivo no Storage (para evitar colisões)
            const filePath = `artifacts/${__app_id || 'default-app-id'}/${storagePath}/${fileName}_${Date.now()}`;
            const storageRef = ref(storage, filePath);

            console.log("Iniciando upload para Firebase Storage:", filePath);
            const snapshot = await uploadBytes(storageRef, fileToUpload);
            const downloadURL = await getDownloadURL(snapshot.ref);

            console.log("Upload de imagem concluído. URL:", downloadURL);
            setPreviewUrl(downloadURL); // Atualiza prévia para a URL final do Storage
            onUploadSuccess(downloadURL); // Notifica o componente pai
        } catch (err: any) {
            console.error("Erro no upload da imagem:", err);
            const errorMessage = err.message || "Erro desconhecido ao fazer upload da imagem.";
            setError(errorMessage);
            onUploadError(errorMessage); // Notifica o componente pai sobre o erro
        } finally {
            setLoading(false);
            if (fileInputRef.current) {
                fileInputRef.current.value = ''; // Limpa o input file para permitir o re-upload do mesmo arquivo
            }
        }
    };

    return (
        <div className={`flex flex-col items-center justify-center p-4 border border-gray-300 rounded-lg shadow-sm bg-white ${className}`}>
            <label htmlFor={id} className="cursor-pointer flex flex-col items-center justify-center w-full h-full text-gray-600 hover:text-blue-600 transition-colors">
                <div className="relative w-24 h-24 rounded-full border-2 border-dashed border-gray-400 flex items-center justify-center overflow-hidden mb-2">
                    {previewUrl && !loading ? (
                        <img src={previewUrl} alt="Prévia" className="w-full h-full object-cover" />
                    ) : loading ? (
                        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
                    ) : (
                        <ImageIcon className="h-10 w-10 text-gray-400" />
                    )}
                </div>
                <span className="text-sm font-medium text-center">{labelText}</span>
                <input
                    id={id}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileChange}
                    ref={fileInputRef}
                    disabled={loading}
                />
            </label>
            {loading && <p className="text-sm text-blue-500 mt-2">Enviando imagem...</p>}
            {error && <p className="text-sm text-red-500 mt-2 flex items-center"><XCircle className="h-4 w-4 mr-1"/>{error}</p>}
        </div>
    );
};


// =========================================================================
// 2. COMPONENTE DocumentUploader
// =========================================================================
interface DocumentUploaderProps {
    id: string;
    labelText: string;
    storagePath: string; // Ex: 'documents', 'reports'
    onUploadSuccess: (downloadURL: string) => void;
    onUploadError: (error: string) => void;
    acceptedFileTypes?: string; // Ex: ".pdf,.doc,.docx,application/pdf"
    className?: string; // Classes Tailwind para o container
}

export const DocumentUploader: React.FC<DocumentUploaderProps> = ({
    id,
    labelText,
    storagePath,
    onUploadSuccess,
    onUploadError,
    acceptedFileTypes = '*', // Aceita todos os tipos por padrão
    className
}) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [fileName, setFileName] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        setLoading(true);
        setError(null);
        setFileName(file.name);

        try {
            const storage = getFirebaseStorage();
            if (!storage) {
                throw new Error("Firebase Storage não inicializado. Verifique sua configuração do Firebase.");
            }

            // Nome único para o arquivo no Storage
            const filePath = `artifacts/${__app_id || 'default-app-id'}/${storagePath}/${file.name}_${Date.now()}`;
            const storageRef = ref(storage, filePath);

            console.log("Iniciando upload de documento para Firebase Storage:", filePath);
            const snapshot = await uploadBytes(storageRef, file);
            const downloadURL = await getDownloadURL(snapshot.ref);

            console.log("Upload de documento concluído. URL:", downloadURL);
            onUploadSuccess(downloadURL); // Notifica o componente pai
            setFileName(file.name); // Mantém o nome do arquivo para mostrar sucesso
        } catch (err: any) {
            console.error("Erro no upload do documento:", err);
            const errorMessage = err.message || "Erro desconhecido ao fazer upload do documento.";
            setError(errorMessage);
            onUploadError(errorMessage); // Notifica o componente pai sobre o erro
        } finally {
            setLoading(false);
            if (fileInputRef.current) {
                fileInputRef.current.value = ''; // Limpa o input file
            }
        }
    };

    return (
        <div className={`flex flex-col items-center justify-center p-4 border border-gray-300 rounded-lg shadow-sm bg-white ${className}`}>
            <label htmlFor={id} className="cursor-pointer flex flex-col items-center justify-center w-full h-full text-gray-600 hover:text-blue-600 transition-colors">
                <div className="flex items-center justify-center mb-2">
                    {loading ? (
                        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
                    ) : fileName ? (
                        <CheckCircle className="h-10 w-10 text-green-500" />
                    ) : (
                        <FileText className="h-10 w-10 text-gray-400" />
                    )}
                </div>
                <span className="text-sm font-medium text-center">{labelText}</span>
                {fileName && !loading && !error && <p className="text-xs text-gray-500 break-words max-w-full text-center">{fileName}</p>}
                <input
                    id={id}
                    type="file"
                    accept={acceptedFileTypes}
                    className="hidden"
                    onChange={handleFileChange}
                    ref={fileInputRef}
                    disabled={loading}
                />
            </label>
            {loading && <p className="text-sm text-blue-500 mt-2">Enviando documento...</p>}
            {error && <p className="text-sm text-red-500 mt-2 flex items-center"><XCircle className="h-4 w-4 mr-1"/>{error}</p>}
        </div>
    );
};
