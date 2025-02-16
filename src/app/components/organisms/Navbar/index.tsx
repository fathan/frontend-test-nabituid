import Image from 'next/image';

import { IoMdNotificationsOutline } from "react-icons/io";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { MdKeyboardArrowDown } from "react-icons/md";

import ToggleSwitch from '../../atoms/ToggleSwitch';

export default function Navbar () {
  return (
    <div className="w-full px-6 py-4 bg-white flex justify-end items-center gap-4 border-b">
      <div className="flex items-center">
        <ToggleSwitch />
      </div>

      <button
        className="relative p-2 text-gray-600 bg-gray-100 rounded-full"
        aria-label="Notifications"
      >
        <IoMdNotificationsOutline />
      </button>

      <button
        className="relative p-2 text-gray-600 bg-gray-100 rounded-full"
        aria-label="Chat"
      >
        <IoChatbubbleEllipsesOutline />
        <div className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
      </button>

      <div className="flex items-center gap-3">
        <div className="text-right">
          <div className="text-sm font-medium text-gray-900">
            John Doe
          </div>
          <div className="text-xs text-gray-500">
            Verified Member
          </div>
        </div>

        <div className="relative flex flex-row">
          <Image
            src="https://avatar.iran.liara.run/public/17"
            alt="Profile"
            width={40}
            height={40}
            className="w-10 h-10 rounded-full object-cover"
          />
          <button className="ml-1 text-gray-400">
            <MdKeyboardArrowDown />
          </button>
        </div>
      </div>
    </div>
  );
}