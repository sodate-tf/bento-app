interface BarraDeProgressoProps {
  percentage: number;
  size?: number; // Tamanho do círculo (largura/altura em px)
  strokeWidth?: number; // Espessura da linha do círculo em px
  circleColor?: string; // Cor de fundo do círculo
  progressColor?: string; // Cor da linha de progresso
  textColor?: string; // Cor do texto da porcentagem
}

export default function BarraDeProgresso(props: BarraDeProgressoProps){
    const percentage = props.percentage
    const size = props.size || 100
    const strokeWidth = props.strokeWidth || 10
    const circleColor = props.circleColor || '#e0e0e0' // Cinza claro
    const progressColor = props.progressColor || '#2563eb' // Azul padrão do Tailwind (blue-600)
    const textColor = props.textColor || '#1f2937' // Cinza escuro

   const radius = (size - strokeWidth) / 2;
   const circumference = radius * 2 * Math.PI;
   const offset = circumference - (percentage / 100) * circumference;
    return(
        <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg
        className="transform -rotate-90" // Gira o SVG para que o progresso comece em cima
        width={size}
        height={size}
      >
        {/* Círculo de fundo */}
        <circle
          stroke={circleColor}
          fill="transparent"
          strokeWidth={strokeWidth}
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        {/* Círculo de progresso */}
        <circle
          stroke={progressColor}
          fill="transparent"
          strokeWidth={strokeWidth}
          r={radius}
          cx={size / 2}
          cy={size / 2}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round" // Borda arredondada no final do progresso
          style={{ transition: 'stroke-dashoffset 0.35s linear' }} // Animação suave
        />
      </svg>
      {/* Texto da porcentagem no centro */}
      <span
        className="absolute text-xl font-bold"
        style={{ color: textColor }}
      >
        {`${Math.round(percentage)}%`}
      </span>
    </div>
    )
}