output "application_url" {
  description = "Public staging URL."
  value       = "http://${aws_lb.app.dns_name}"
}

output "artifact_bucket" {
  description = "S3 bucket used by the CD workflow."
  value       = aws_s3_bucket.artifacts.id
}

output "codedeploy_application" {
  value = var.enable_codedeploy ? aws_codedeploy_app.app[0].name : null
}

output "codedeploy_deployment_group" {
  value = var.enable_codedeploy ? aws_codedeploy_deployment_group.app[0].deployment_group_name : null
}

output "github_actions_role_policy" {
  description = "Minimum permissions to attach to the GitHub OIDC deployment role."
  value = jsonencode({
    Version = "2012-10-17"
    Statement = [
      { Effect = "Allow", Action = ["s3:PutObject", "s3:GetObject"], Resource = "${aws_s3_bucket.artifacts.arn}/*" },
      { Effect = "Allow", Action = ["ssm:SendCommand", "ssm:GetCommandInvocation", "ssm:ListCommandInvocations"], Resource = "*" },
      { Effect = "Allow", Action = ["ec2:DescribeInstances"], Resource = "*" }
    ]
  })
  sensitive = true
}

output "github_actions_role_arn" {
  description = "Role ARN to add as the AWS_ROLE_ARN GitHub environment variable."
  value       = var.github_repository == "" ? null : aws_iam_role.github_actions[0].arn
}
