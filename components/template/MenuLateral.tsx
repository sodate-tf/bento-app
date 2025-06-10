import useAuth from '@/src/data/hook/useAuth'
import { IconeAbrirFechar, IconeAcampa, IconeAjustes, IconeDashboard, IconeEquipeAcampa, IconeEquipeTrabalho, IconeHome, IconePreInscricao, IconeSair, IconeSino } from '../icons'
import Logo from './Logo'
import MenuItem from './MenuItem'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from '../ui/button'

export default function MenuLateral(){
    const { logout } = useAuth()
    return(
        <>
        <div className='sm:hidden'>
            <Sheet>
                <SheetTrigger asChild >
                    <div className='absolute w-2 h-2 flex top-2'>
                        <Button variant="outline" className='flex w-2 h-2 p-4 rounded-full bg-slate-950 text-white'>
                            {IconeAbrirFechar}
                        </Button>
                    </div>
                </SheetTrigger>
                <SheetContent side='left' className='w-20'>
                    <aside className='flex flex-col dark:bg-gray-950 dark:gray-200  bg-gray-200 gray-950'>
                        <ul className='flex-grow'>
                           <MenuItem url="/" texto='Início'  icone={IconeHome}/>
                            <MenuItem url='/acampamentos' texto='Acampas' icone={IconeAcampa} />
                            <MenuItem url='/equipe' texto='Equipe' icone={IconeEquipeTrabalho} />
                            <MenuItem url='/pre-inscricoes' texto='Inscrições' icone={IconePreInscricao} />
                            <MenuItem url='/equipe/equipe-acampa' texto='Equipe / Acampa' icone={IconeEquipeAcampa} />
                            <MenuItem url="/ajustes" texto='Ajustes' icone={IconeAjustes}/>
                            <MenuItem url="/notificacoes" texto='Notificações' icone={IconeSino}/>
                        </ul>
                        <ul>
                            <MenuItem texto='Sair' icone={IconeSair} className='text-red-600 hover:bg-red-400 hover:text-white' onClick={logout}/>
                        </ul>
                    </aside>
                </SheetContent>
            </Sheet>
        </div>
        <div className='hidden sm:block '>
            <aside className=' flex flex-col dark:bg-gray-950 dark:gray-200  bg-gray-200 gray-950'>
                        <div className={`h-20 w-20 flex flex-col items-center justify-center`}>
                            <Logo />
                        </div>
                        <ul className='flex-grow'>
                            <MenuItem url="/" texto='Início'  icone={IconeHome}/>
                            <MenuItem url='/acampamentos' texto='Acampas' icone={IconeAcampa} />
                            <MenuItem url='/equipe' texto='Equipe' icone={IconeEquipeTrabalho} />
                            <MenuItem url='/pre-inscricoes' texto='Inscrições' icone={IconePreInscricao} />
                            <MenuItem url='/equipe/equipe-acampa' texto='Equipe / Acampa' icone={IconeEquipeAcampa} />
                            <MenuItem url="/ajustes" texto='Ajustes' icone={IconeAjustes}/>
                            <MenuItem url="/notificacoes" texto='Notificações' icone={IconeSino}/>
                        </ul>
                        <ul>
                            <MenuItem texto='Sair' icone={IconeSair} className='text-red-600 hover:bg-red-400 hover:text-white' onClick={logout}/>
                        </ul>
                    </aside>
        </div>
        </>
    )
}