import React from 'react';
import {Card,List,ListItem,ListItemPrefix} from "@material-tailwind/react";
import {UserCircleIcon,PowerIcon,ListBulletIcon} from "@heroicons/react/24/solid";

interface NavBarProfileProps {
    onProfileClick: () => void;
    onReservationsClick: () => void;
}

const NavBarProfile: React.FC<NavBarProfileProps> = ({ onProfileClick, onReservationsClick }) => {
    return (
        <><Card placeholder="Your Placeholder Text" className="h-[calc(100vh-2rem)] w-full max-w-[12rem] p-4 shadow-xl shadow-blue-gray-900/5">
            <List placeholder="Your Placeholder Text">
                <ListItem placeholder="Your Placeholder Text" onClick={onProfileClick}>
                    <ListItemPrefix placeholder="Your Placeholder Text">
                        <UserCircleIcon className="h-5 w-5" />
                    </ListItemPrefix>
                    Mi perfil
                </ListItem>
                <ListItem placeholder="Your Placeholder Text"onClick={onReservationsClick}>
                    <ListItemPrefix placeholder="Your Placeholder Text"  >
                        <ListBulletIcon className="h-5 w-5" />
                    </ListItemPrefix>
                    Mis reservas
                </ListItem>
                <ListItem placeholder="Your Placeholder Text">
                    <ListItemPrefix placeholder="Your Placeholder Text">
                        <PowerIcon className="h-5 w-5" />
                    </ListItemPrefix>
                    Log Out
                </ListItem>
            </List>
        </Card>
        
        </>
    );
};

export default NavBarProfile;
