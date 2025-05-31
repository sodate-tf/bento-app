import useAuth from '@/src/data/hook/useAuth'
import { IconeAcampa, IconeAjustes, IconeDashboard, IconeHome, IconeSair, IconeSino } from '../icons'
import Logo from './Logo'
import MenuItem from './MenuItem'
export default function MenuLateral(){
    const { logout } = useAuth()
    return(
        <aside className='flex flex-col dark:bg-gray-950 dark:gray-200  bg-gray-200 gray-950'>
            <div className={`h-20 w-20 flex flex-col items-center justify-center`}>
                <Logo />
            </div>
            <ul className='flex-grow'>
                <MenuItem url="/" texto='Início'  icone={IconeDashboard}/>
                <MenuItem url='/acampamentos' texto='Acampas' icone={IconeAcampa} />
                <MenuItem url="/ajustes" texto='Ajustes' icone={IconeAjustes}/>
                <MenuItem url="/notificacoes" texto='Notificações' icone={IconeSino}/>
            </ul>
            <ul>
                <MenuItem texto='Sair' icone={IconeSair} className='text-red-600 hover:bg-red-400 hover:text-white' onClick={logout}/>
            </ul>
        </aside>
    )
}