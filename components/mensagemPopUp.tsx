"use cilent"
import { useTheme } from "next-themes"
import { Toaster as Sonner, ToasterProps } from "sonner"

export interface MensagemPopUpProps{
    tema: "dark" | "light" | "system"
    className?: string
    icone?: string
}
export default function MensagemPopUp(props: MensagemPopUpProps){
    return(
       <Sonner
          theme={props.tema}
          className="toaster group"
          style={
                {
                "--normal-bg": "var(--popover)",
                "--normal-text": "var(--popover-foreground)",
                "--normal-border": "var(--border)",
                } as React.CSSProperties
            }
        {...props}
       />
    )
}