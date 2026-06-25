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
       
fdkedbf

    </div>)
}