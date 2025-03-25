import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom'
import { Button } from '../ui/button'
import { useSignOutAccount } from '@/lib/react-query/queriesAndMutations'
import { useEffect } from 'react';
import { useUserContext } from '@/context/AuthContext';
import { sidebarLinks } from '@/constants';
import { INavLink } from '@/types';

const LeftSidebar = () => {
  const { pathname } = useLocation();
  const { mutate: signOut, isSuccess } = useSignOutAccount();
  const navigate = useNavigate();
  const { user } = useUserContext();

  useEffect(() => {
    if (isSuccess) navigate(0);
  }, [isSuccess])

  return (
    <nav className='leftsidebar'>
        <div className='flex flex-col gap-6'>
        <Link to="/" className="flex gap-3 items-center">
            <img 
                src="/assets/images/logo.jpg"
                alt="logo"
                width={130}
                height={25}
            />
            </Link>

            <Link to={`/profile/${user.id}`} className='flex gap-2 items-center'>
                <img
                    src={user.imageUrl || "/assets/icons/profile-placeholder.svg"}
                    alt="profile"
                    className='h-12 w-12 rounded-full'
                />
                <div className='flex flex-col'>
                    <p className="text-sm font-semibold">
                        {user.name}
                    </p>
                    <p className='text-xs text-light-3'>
                        @{user.username}
                    </p>
                </div>
            </Link>

            <ul className='flex flex-col gap-3'>
                {sidebarLinks.map((link: INavLink) => {
                    const isActive = pathname === link.route;
                    return(
                        <li key={link.label} className={`leftsidebar-link group ${
                            isActive && 'bg-primary-500'
                        }`}>
                            <NavLink
                                to={link.route}
                                className="flex gap-3 items-center p-2 text-sm"
                            >
                                <img
                                    src={link.imgURL}
                                    alt={link.label}
                                    className=
                                    {`group-hover:invert-white ${
                                        isActive && 'invert-white'}`}
                                />
                                {link.label}

                            </NavLink>
                        </li>
                    )
                })}
            </ul>
        </div>

        <Button 
        variant="ghost" 
        className='shad-button_ghost p-2 text-sm' 
        onClick={() => signOut()}>
            <img src="/assets/icons/logout.svg" alt="logout" />
            <p className='text-sm'>Logout</p>
        </Button>

    </nav>
  )
}

export default LeftSidebar