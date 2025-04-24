import { IconButtonProps, NavbarProps } from '@/interface/navbar'
import { cn } from '@/lib/utils'
import { ChevronLeftIcon } from 'lucide-react'
import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const IconButton: React.FC<IconButtonProps> = ({ onClick, active, icon, notificationValue }) => (
    <button
        onClick={onClick}
        className={cn('rounded-full p-1 transition-colors duration-200 relative',
            active ? 'bg-maroonPink text-white' : 'bg-white text-luckyBlue',
        )} >
        {icon}
        {notificationValue ?
            <span className='absolute -top-2 -right-2 bg-maroonPink rounded-full w-5 h-5 flex justify-center items-center text-white'>
                {notificationValue}
            </span> :
            null
        }
    </button>
);

const NavbarLayout: React.FC<NavbarProps> = ({
    navigationLink,
    actions,
    label,
}) => {
    const navigate = useNavigate()
    const { pathname } = useLocation()

    const handleNavigateBack = () => {
        navigate(-1)
    }

    return (
        <nav className="w-full flex flex-row justify-between h-16 items-center p-2 bg-slate-200 md:rounded-lg border-b border-slate-300">
            {navigationLink ? (
                <button onClick={handleNavigateBack} className="bg-white rounded-full shadow-md">
                    <ChevronLeftIcon size={32} className="text-gray-800 text-xl" />
                </button>
            ) : (
                <div></div>
            )}
            {label && <h1 className="text-lg font-bold text-gray-800">{label}</h1>}
            {actions && (
                <div className="flex flex-row gap-4 pr-2">
                    {actions.map((item, index) => (
                        <IconButton
                            key={index}
                            onClick={() => navigate(item.route)}
                            active={pathname === item.route}
                            icon={item.icon}
                            notificationValue={undefined}
                        />
                    ))}
                </div>
            )}
        </nav>
    )
}

export default NavbarLayout