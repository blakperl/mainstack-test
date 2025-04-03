'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import MenuIcon from '../icons/MenuIcon'
import { useUser } from '../hooks/useUser'
import SettingsIcon from '@mui/icons-material/Settings';
import OutputIcon from '@mui/icons-material/Output';
import FilterIcon from '@mui/icons-material/Filter';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import SettingsCellOutlinedIcon from '@mui/icons-material/SettingsCellOutlined';
import BugReportOutlinedIcon from '@mui/icons-material/BugReportOutlined';
import WindowIcon from '@mui/icons-material/Window';

const LINKS = [
  { name: 'Home', to: '/#home', icon: '/home.png' },
  { name: 'Analytics', to: '/#analytics', icon: '/analytics.png' },
  { name: 'Revenue', to: '/#revenue', icon: '/revenue.png' },
  { name: 'CRM', to: '/#crm', icon: '/crm.png' },
  { name: 'Apps', to: '/#app', icon: '/app.png' },
]

export default function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const { data, error, isLoading } = useUser()

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev)
  }

  if (isLoading) return <div>Loading user data...</div>
  if (error instanceof Error) return <div>Error: {error.message}</div>

  return (
    <nav className="sticky top-0 bg-white z-50 mx-2 rounded-full shadow-lg">
      <div className="flex items-center justify-between py-4 container mx-auto">
        <Link href="/">
          <Image src="/logo.png" width={32} height={35} alt="Logo" />
        </Link>

        <div className="flex space-x-10">
          {LINKS.map((item, index) => {
            const isRevenue = item.name === 'Revenue';
            const iconSrc = isRevenue && isDropdownOpen ? '/revenue-black.svg' : item.icon;

            return (
              <Link
                href={item.to}
                key={index}
                className={` slide-in flex items-center space-x-2 
                  ${isRevenue && !isDropdownOpen ? 'filled-button h-12 w-[8rem] flex place-items-center justify-center' : ''}`}
                style={{ animationDelay: `${index / 3}s` }}
              >
                <Image src={iconSrc} alt={item.name} width={20} height={20} />
                <span>{item.name}</span>
              </Link>
            )
          })}
        </div>

        <div className="flex space-x-8 justify-center items-center">
          <Link href="/"><Image src="/notifications.png" width={25} height={20} alt="Notifications" /></Link>
          <Link href="/"><Image src="/chat.png" width={25} height={20} alt="Chat" /></Link>
          <div className="relative">
            <div
              className="outlined-button w-[6rem] h-12 flex items-center justify-between px-3 cursor-pointer"
              onClick={toggleDropdown}
            >
             <p className="bg-black text-white rounded-full w-8 h-8 flex items-center justify-center">
                      {`${data?.first_name?.charAt(0) ?? ''}${data?.last_name?.charAt(0) ?? ''}`}
                    </p>
              <MenuIcon />
            </div>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-md py-2">
                <ul className="space-y-6 px-6 pb-4 text-sm">
                  <li>
                    <Link href="#">
                      <div className="flex gap-4 items-center mt-4">
                      <p className="bg-black text-white rounded-full w-8 h-8 flex items-center justify-center">
                      {`${data?.first_name?.charAt(0) ?? ''}${data?.last_name?.charAt(0) ?? ''}`}
                    </p>
                        <div>
                          <h1 className="text-2xl font-bold text-black">
                            {data?.first_name} {data?.last_name}
                          </h1>
                          <p className="text-xs">{data?.email}</p>
                        </div>
                      </div>
                    </Link>
                  </li>
                  <li><Link href="#" className='flex gap-2 items-center'> <SettingsIcon />
                  Settings</Link></li>
                  <li><Link href="#" className='flex gap-2 items-center'> 
                  < SettingsCellOutlinedIcon />
                  Purchase History</Link></li>
                  <li><Link href="#"  className='flex gap-2 items-center'>
                  <WorkOutlineIcon />
                  Refer and Earn</Link></li>
                  <li><Link href="#" className='flex gap-2 items-center'>
                  <WindowIcon />
                  Integrations</Link></li>
                  <li><Link href="#" className='flex gap-2 items-center'>
                  <BugReportOutlinedIcon /> 
                  Report Bug</Link></li>
                  <li><Link href="#" className='flex gap-2 items-center'> <FilterIcon/> 
                  Switch Account</Link></li>
                  <li><Link href="#"  className='flex gap-2 items-center'>
                  <OutputIcon/>
                  Sign Out</Link></li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
