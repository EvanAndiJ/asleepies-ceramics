import type {OrderResponseBody} from "@paypal/paypal-js";

export interface OutContext {
  // signIn: (data: Response) => void,
  // confirmSignOut: () => void,
  onAddToCart: (item: SkuInfo) => void,
  onRemoveFromCart: (newCart: {items:string[],total:number}) => void,
  removeAllFromCart: () => void,
  onPaid: (details: OrderResponseBody, holdId: string) => void
}
export interface SkuInfo {
  id: number,
  _id?: string,
  sku: string,
  price: number,
  stock: number,
  title: string,
  desc: string,
  images: string[],
}
export interface User {
  id: number,
  username: string,
  email: string,
  cart: number,
  itemCount: number,
  roles: string[],
  last: number,
}
export interface UserLogin extends User {
  accessToken: string,
  loggedIn: number
}
export interface UserMenuProps {
  logOut: ()=>void,
  isLoggedIn: boolean
}
export interface UserEditorProps {
  username: string,
  emailAddress: string,
  onEdit: (f: string, edit: string) => void,
  isEdited: boolean,
  onSave: (user: string, email: string, f: string) => Response
}

export interface CheckoutItemProp {
  itemProp: SkuInfo,
}
export interface CartItemProp extends CheckoutItemProp {
  onRemove: (item: SkuInfo) => void
}
export interface ItemDetailProps {
  info: SkuInfo,
  onAdd: (item: SkuInfo) => void
}

export interface ImageEditProps {
  images: string[], 
  staging: {
    newImages: string[], 
    setNewImages: React.Dispatch<React.SetStateAction<string[]>>,
    imgLinks: string,
    handleChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void},
  onDelete: {
    delImages: string[], 
    setDelImages: React.Dispatch<React.SetStateAction<string[]>>
  }
}

export interface ImageThumbProps {
  del: { 
    handleDel: (event: React.MouseEvent<HTMLButtonElement>)=>void,
    cancelDel: (event: React.MouseEvent<HTMLButtonElement>)=>void,
  },
  filename: string
}