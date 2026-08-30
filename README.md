# B8IT122 Cloud Infrastructure and Virtualisation

This is my individual CI/CD project for B8IT122. I used Terraform to create an AWS staging environment in the Europe Ireland region. I used GitHub Actions to check the application and the Terraform files before deployment.

The application is a small Node.js web service. It is not intended to be a complete product. I created it so that I could show a visible change moving from GitHub to a live staging environment.

## What I built

The infrastructure contains a VPC with two public subnets and two private subnets across two Availability Zones. The Application Load Balancer is in the public network and the EC2 application runs in the private network. The EC2 instance does not have a public IP address and SSH access is not allowed.

The project also includes an Internet Gateway, one NAT Gateway, route tables, security groups, an Auto Scaling Group, Amazon S3, CloudWatch, SNS and AWS Budgets. The S3 bucket stores application packages with encryption and versioning enabled.

My Lucidchart architecture diagram is available here:

[View the AWS architecture diagram](docs/B8IT122_Staging_Architecture_Lucidchart.png)

## GitHub workflow

The workflow is stored in `.github/workflows/pipeline.yml`.

For a pull request to `main`, GitHub performs these checks:

1. Install the Node.js packages
2. Check the JavaScript syntax
3. Run the automated tests
4. Build the application package
5. Check the Terraform formatting
6. Validate the Terraform configuration

After a change is merged into `main`, the same checks run again. Deployment only starts when the GitHub variable `ENABLE_STAGING_DEPLOY` is set to `true`. This allows me to keep deployment disabled while the EC2 capacity is paused.

GitHub uses OpenID Connect to request temporary AWS credentials. Permanent AWS access keys are not stored in the repository. The workflow uploads the application package to S3 and uses AWS Systems Manager to deploy it to the private EC2 instance. It then checks the public `/health` endpoint.

## Run the application locally

Node.js 20 or later is required.

```bash
npm ci
npm run check
npm start
```

The application is then available at `http://localhost:3000` and the health endpoint is available at `http://localhost:3000/health`.

## Check the Terraform configuration

Terraform 1.6 or later is required. The example variables file can be copied before running Terraform.

```bash
cd infrastructure/terraform
cp terraform.tfvars.example terraform.tfvars
terraform init
terraform fmt -check -recursive
terraform validate
terraform plan -out=staging.tfplan
```

The plan must be checked before it is applied because the NAT Gateway, Application Load Balancer and EC2 instance can generate AWS charges.

## Staging settings in GitHub

The `staging` environment uses the following GitHub variables:

1. `AWS_REGION`
2. `AWS_ROLE_ARN`
3. `ARTIFACT_BUCKET`
4. `INSTANCE_TAG_NAME`
5. `STAGING_URL`
6. `ENABLE_STAGING_DEPLOY`

The values are taken from the Terraform outputs and the deployed AWS resources. The deployment control should only be enabled while the staging capacity is active.

## CodeDeploy limitation

CodeDeploy was part of my original design, but the service could not be activated with the AWS Free account plan used for this project. I kept it as an optional Terraform feature and used Systems Manager for the working deployment demonstration. The default value of `enable_codedeploy` is `false`.

## Monitoring and rollback

The load balancer checks the application through `/health`. CloudWatch monitors unhealthy targets and can send a notification through SNS.

S3 keeps earlier versions of the application packages. If a deployment fails, the workflow stops and an earlier working package can be deployed manually. Automatic rollback is only available if the optional CodeDeploy resources are enabled.

## Cost control

This is a temporary staging environment. The Auto Scaling Group can be reduced to zero when the application is not being demonstrated. The NAT Gateway and Application Load Balancer continue to generate charges while they exist, even when the EC2 capacity is zero.
