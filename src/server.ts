import application from './app/app';

const runServer = async () => {
    const app = await application();
    const port = 3000;

    app.listen(port);

    console.log(`Server running on port ${port}`);
};

runServer();
