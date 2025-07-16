import { fastify } from 'fastify';
import { fastifyMultipart } from '@fastify/multipart';
import { serializerCompiler, validatorCompiler, type ZodTypeProvider } from 'fastify-type-provider-zod';
import { fastifyCors} from '@fastify/cors';
import { env } from './env.ts';
//Routes
import { getRoomsRoute } from './http/routes/get-rooms.ts';
import { createRoomRoute } from './http/routes/create-room.ts';
import { createQuestionRoute } from './http/routes/create-question.ts';
import { getRoomQuestionsRoute } from './http/routes/get-room-questions.ts';
import { uploadAudioRoute } from './http/routes/upload-audio.ts';

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.register(fastifyCors, {
    origin: 'http://localhost:5173',
})

app.setSerializerCompiler(serializerCompiler);
app.setValidatorCompiler(validatorCompiler);

app.get('/health', () => {
    return 'OK';
});

app.register(fastifyMultipart);
app.register(getRoomsRoute);
app.register(createRoomRoute);
app.register(createQuestionRoute);
app.register(getRoomQuestionsRoute);
app.register(uploadAudioRoute);

app.listen({ port: env.PORT }).then(() => {
    console.log('Server is running on http://localhost:3333');
})