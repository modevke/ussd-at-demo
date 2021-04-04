import { getMenuContent } from './configs/menu-content'

export const menuPicker = {
    getMenu: (unique_identifier: string, level: string) => {
        try{
            let rawData = getMenuContent();
            return rawData[level][unique_identifier].title;
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
    getMenuFunctionTitle: (operation_name, operation_data, unique_identifier, level) => {
        try{
            let rawData = getMenuContent();
            return rawData[level][unique_identifier].title(operation_name, operation_data)
        }catch(e){
            console.log('Error getMenuFunctionTitle: '+e);
        }
    },
    getMenuFunctionTag: (operation_name, operation_data, unique_identifier, level) => {
        try{
            let rawData = getMenuContent();
            return rawData[level][unique_identifier].next(operation_name, operation_data)
        }catch(e){
            console.log('Error getMenuFunctionTag: '+e);
        }
    }
}

