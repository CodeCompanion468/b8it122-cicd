# Project details

- Module: B8IT122 Cloud Infrastructure & Virtualisation
- Assessment: Cloud Computing & Server Virtualisation
- Student: Diana Thomsen
- Student number: 20037422
- Submission type: Individual work
- GitHub owner: CodeCompanion468
- Intended repository: CodeCompanion468/b8it122-cicd
- Cloud provider: Amazon Web Services (AWS)
- Referencing style: Harvard

## Terminology note

The assessment details require VPC creation and specifically list subnets, route tables, an internet gateway and security groups. The later deliverables and marking table use the phrase "VPN Architecture". This project treats that phrase as "VPC Architecture" because the requested components form an AWS VPC. Confirmation from the lecturer should be retained with the submission if available.

## Implementation environment note

AWS CloudShell could not create an environment for the student account in either Europe (Stockholm) or Europe (Ireland). To continue without creating long-lived AWS access keys, the project used the official AWS CLI locally with AWS Management Console browser login. This produces temporary credentials for local development rather than storing permanent credentials.

Terraform 1.9.8 was also obtained from HashiCorp's official release service and used from a temporary local directory. This matched the version configured in GitHub Actions and avoided changing the workstation's wider software configuration. Terraform was selected so that the assessed AWS architecture could be created consistently, validated automatically, documented as code and destroyed promptly after evidence collection to control cost.
