import { useForm } from "react-hook-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { z } from "zod/v4";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { useCreateRoom } from "@/http/use-create-room";

const createRoomSchema = z.object({
    name: z.string().min(1, {message: 'O nome da sala é obrigatório'}),
    description: z.string().optional(),
})

type CreateRoomFormData = z.infer<typeof createRoomSchema>;

export function CreateRoomForm() {
    const { mutateAsync: createRoom } = useCreateRoom();

    const createRoomForm = useForm<CreateRoomFormData>({
        resolver: zodResolver(createRoomSchema),
        defaultValues: {
            name: "",
            description: "",
        },
    })

    async function handleCreateRoom({name,description}: CreateRoomFormData) {
        await createRoom({name,description});
        await createRoomForm.reset();
    }

    return(
        <Card>
            <CardHeader>    
                <CardTitle>Criar Sala</CardTitle>
                <CardDescription>Crie uma nova sala para enviar suas perguntas e receber respostas da I.A. em tempo real.</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...createRoomForm}>
                    <form onSubmit={createRoomForm.handleSubmit(handleCreateRoom)} className="flex flex-col gap-4">
                        <FormField
                            control={createRoomForm.control}
                            name="name"
                            render={({field}) => {
                                return(
                                    <FormItem>
                                        <FormLabel>Nome da Sala</FormLabel>
                                        <FormControl>
                                            <Input {...field} placeholder="Informe o nome da sala ..." />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )
                            }}
                        />
                        <FormField
                            control={createRoomForm.control}
                            name="description"
                            render={({field}) => {
                                return(
                                    <FormItem>
                                        <FormLabel>Descrição</FormLabel>
                                        <FormControl>
                                            <Textarea {...field} placeholder="Informe a descrição da sala ..." />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )
                            }}
                        />
                        <Button type="submit" className="w-full">Criar Sala</Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}