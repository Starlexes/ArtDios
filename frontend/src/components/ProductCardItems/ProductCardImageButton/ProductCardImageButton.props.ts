import { ButtonHTMLAttributes} from 'react';


export interface ProductCardImageButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
    imageName: string,
    imagePath:string
}