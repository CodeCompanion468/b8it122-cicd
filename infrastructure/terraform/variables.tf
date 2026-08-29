variable "aws_region" {
  description = "AWS region used for the staging environment."
  type        = string
  default     = "eu-west-1"
}

variable "project_name" {
  description = "Lowercase name used as the resource prefix."
  type        = string
  default     = "b8it122-demo"
}

variable "environment" {
  description = "Deployment environment name."
  type        = string
  default     = "staging"
}

variable "vpc_cidr" {
  description = "CIDR range for the VPC."
  type        = string
  default     = "10.40.0.0/16"
}

variable "instance_type" {
  description = "EC2 size for the demonstration workload."
  type        = string
  default     = "t3.micro"
}

variable "desired_capacity" {
  description = "Normal number of application instances."
  type        = number
  default     = 1
}

variable "alert_email" {
  description = "Optional email address for SNS deployment alarms."
  type        = string
  default     = ""
  sensitive   = true
}

variable "github_repository" {
  description = "GitHub repository in owner/name form. Leave blank to skip the OIDC deployment role."
  type        = string
  default     = ""
}
