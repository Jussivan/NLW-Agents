import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { dayjs } from "@/lib/dayjs";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useRooms } from "@/http/use-rooms";

export function RoomList() {
    const {data, isLoading} = useRooms();

    return(
        <Card>
            <CardHeader>
                <CardTitle>Salas Recentes</CardTitle>
                <CardDescription>Acesso rápido para as salas criadas recentemente !</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
                {data?.map(room => {
                    return <Link key={room.id} to={`/room/${room.id}`} className="flex items-center justify-between p-3 rounded-md border hover:bg-accent">
                        <div className="flex-1 flex flex-col gap-1">
                            <h3 className="font-medium">{room.name}</h3>
                            <div className="flex items-center gap-2">
                                <Badge variant={"secondary"} className="text-xs">{dayjs(room.createdAt).toNow()}</Badge>
                                <Badge variant={"secondary"} className="text-xs">{room.questionsCount} pergunta(s)</Badge>
                            </div>
                        </div>
                        <span className="flex items-center gap-1 text-sm font-semibold">
                            Entrar
                            <ArrowRight className="size-3"/>
                        </span>
                    </Link>
                })}
            </CardContent>
        </Card>
    )
} 