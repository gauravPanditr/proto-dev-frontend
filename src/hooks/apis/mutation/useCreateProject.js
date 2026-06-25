import {useMutation} from "@tanstack/react-query"
import { createProjectApi } from "../../../apis/project"


export const useCreateProject=()=>{
    const {mutationAsync,isPending,isSuccess,error}=useMutation({
        mutationFn:createProjectApi,
        onSuccess:(data)=>{
            console.log("Project Created",data);
            
            
        },
        onError:()=>{
                console.log("Error Creating Project");
                
        }

    });

    return{
        createProjectMutations:mutationAsync,
        isPending,
        isSuccess,
        error
    }
}