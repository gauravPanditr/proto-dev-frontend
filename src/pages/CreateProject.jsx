import { useCreateProject } from "../hooks/apis/mutation/useCreateProject"

export const CreateProject=()=>{
    const {createProjectMutations,isPending,isSuccess}=useCreateProject();

    async function handleCreateProject() {
        try {
            await createProjectMutations();
        } catch (error) {
            console.log("Error Creating Project",error);

            
        }
    }

    return(<div>
       
81020510-475b-4303-bbc9-a7f7ba73610a

    </div>)
}