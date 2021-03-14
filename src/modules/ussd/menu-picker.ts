import { getMenuContent } from './configs/menu-content'

export const menuPicker = {
    getMenu: (unique_identifier: string, level: string) => {
        try{
            let rawData = getMenuContent();
            return rawData[level][unique_identifier].title
        }catch(e){
            console.log('Error getMenu: '+e);
        }
    },
    getMenuTags: (unique_identifier: string, level: string) => {
        try{
            let rawData = getMenuContent();
            return rawData[level][unique_identifier].next
        }catch(e){
            console.log('Error getMenu: '+e);
        }
    },
    getMenuFunction: (operation_name, operation_data, unique_identifier, level) => {
        try{
            let rawData = getMenuContent();
            return rawData[level][unique_identifier](operation_name, operation_data)
        }catch(e){
            console.log('Error getMenu: '+e);
        }
    }
}

