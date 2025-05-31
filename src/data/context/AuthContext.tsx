import { createContext, useEffect, useState } from 'react'
import firebase from '../../firebase/init'
import Usuario from '@/src/model/Usuario'
import route from 'next/router'
import Cookies from 'js-cookie'

interface AuthContextProps{
    usuario?: Usuario
    carregando?: boolean
    loginGoogle?: () => Promise<void>
    login?: (email: string, senha: string) => Promise<void>
    cadastrar?: (email: string, senha: string) => Promise<void>
    logout?: () => Promise<void>
}


const AuthContext = createContext<AuthContextProps>({})

async function usuarioNormalizado(usuarioFirebase: firebase.User): Promise<Usuario>{
    const token = await usuarioFirebase.getIdToken()
    return{
        uid: usuarioFirebase.uid,
        nome: usuarioFirebase.displayName,
        email: usuarioFirebase.email,
        token,
        provedor: usuarioFirebase.providerData[0]?.providerId,
        imageUrl: usuarioFirebase.photoURL
    }
}

function gerenciarCookie(logado: boolean){
    if(logado){
        Cookies.set('admin-templete-bento-auth', ''+logado, {
            expires: 7
        })
    }
    else{
        Cookies.remove('admin-templete-bento-auth')
    }
}
// eslint-disable-next-line
export function AuthProvider(props: any){ 
    const[usuario, setUsuario] = useState<Usuario>()
    const [carregando, setCarregando]= useState(true)

    async function configurarSessao(usuarioFirebase: any){ // eslint-disable-line @typescript-eslint/no-explicit-any
        if (usuarioFirebase?.email){
            const usuario = await usuarioNormalizado(usuarioFirebase)
            setUsuario(usuario)
            gerenciarCookie(true)
            setCarregando(false)
            return usuario.email
        }else{
            setUsuario(undefined)
            gerenciarCookie(false)
            setCarregando(false)
            return false
        }
    }

    async function loginGoogle(){
       try{
          setCarregando(true)
          const resp = await firebase.auth().signInWithPopup(
          new firebase.auth.GoogleAuthProvider()
          )
          await configurarSessao(resp.user)
         route.push('/')
       } finally{
            setCarregando(false)
       }
    }

    async function cadastrar(email: string, senha: string){
         try{
          setCarregando(true)
          const resp = await firebase.auth().createUserWithEmailAndPassword(email,senha)
          await configurarSessao(resp.user)
         route.push('/')
       } finally{
            setCarregando(false)
       }
    }

     async function login(email: string, senha: string){
       try{
          setCarregando(true)
          const resp = await firebase.auth().signInWithEmailAndPassword(email,senha)
          await configurarSessao(resp.user)
         route.push('/')
       } finally{
            setCarregando(false)
       }
    }

    async function logout(){
        try{
            await firebase.auth().signOut()
            await configurarSessao(null)
        } finally{
            setCarregando(false)
        }
    }

    useEffect(() => {
        if(Cookies.get('admin-templete-bento-auth')){
            const cancelar = firebase.auth().onIdTokenChanged(configurarSessao)
            return () => cancelar()
        } else{
            setCarregando(false)
        }
    }, [])
    return(
        <AuthContext.Provider value={{
            usuario,
            carregando,
            loginGoogle,
            login,
            logout,
            cadastrar
        }}>
            {props.children}
        </AuthContext.Provider>
    )
}
export default AuthContext