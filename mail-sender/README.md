# Rhythmic Excellence Mail Sender

## 🚀 Quick start

1.  **Install the Node dependencies**

    ```sh
    npm install
    ```

2.  **Configure your environment variables**

    Rename the `.env.template` file to `.env` and fill all the required information.

3.  **Run a local instance of the lambda function.**

    Use the Gatsby CLI to create a new site, specifying the default starter.

    ```sh
    npm run dev
    ```

4.  **Testing time.**

    This projects makes use of Jest for running all the unit and integration tests.

    ```sh
    npm test
    ```

## 💫 Deploy

Run the following command to deploy the project into your AWS account using Serverless

**Note** You will need to have an AWS account, if you don't have one already, before running this command.
To learn more how to configure your AWS account, read the Serverless documentation
[here](https://serverless.com/framework/docs/providers/aws/guide/credentials/)

When deploying this to AWS Lambda, make sure to set the function environment variables correctly.
