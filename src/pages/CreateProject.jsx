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
       
93d94c68-6914-4795-9343-7ad260b841f4

    </div>)
}