# Devops girls workshop playbook

这是一个Devops girls workshop指南。该指南将引导大家从0开始学习如何将一个应用容器化，并通过CI流水线将该应用部署到AWS云资源上。

## Prerequisite
- Github账号
- Docker
- 支持Node.js的IDE
- git command

## One-time setup
- fork本仓库, 并clone到本地
```shell
git clone https://github.com/devopsgirl2023/hello-ops-girls-demo-<Your name>
```

## Workshop Roadmap
![workshop-roadmap](workshop-roadmap.png)

## WorkShop Part1 - GitHub actions CI in Docker

### Step 1: Write a Dockerfile
```dockerfile
FROM node:19-slim@sha256:f58f1fcf5c9ff9e3752993edb4ed6dbd35697124c85a43f3b97aa054500b0534
WORKDIR /app
RUN apt-get update && apt-get install python3 -y
COPY yarn.lock package.json /app/
RUN yarn install
COPY . /app/
RUN npx tsc
EXPOSE 8000
CMD ["yarn", "start"]
```

### Step 2: Build and run your docker from local
```shell
# Build your docker image
$ docker build -t ops-girls-demo:dev .
# Run a docker container
$ docker run --rm -p 8000:8000 ops-girls-demo:dev
$ docker ps
# 浏览器访问：http://localhost:8000/public/
```

### Step 3: Trigger a CI workflow 
提交并push你的Dockerfile。你应该会在你的repo->Actions里看到一条被触发的流水线。

### Step 4: Create a build and test job in the workflow 
完善CI流水线，添加build和test job。在CI中实现构建、推送镜像，并成功运行单元测试。build步骤参考：
```yaml
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - id: aws-auth
        uses: "./.github/actions/aws-auth"
      - name: Build and push dev image to ECR
        env:
          REGISTRY: ${{ steps.aws-auth.outputs.registry }}
          REPOSITORY: devopsgirl2023/hello-ops-girl
          IMAGE_TAG: ${{ github.sha }}
        run: |
          docker build -t $REGISTRY/$REPOSITORY:$IMAGE_TAG .
          docker push $REGISTRY/$REPOSITORY:$IMAGE_TAG
```

## WorkShop Part2 - 应用AWS搭建网站

## WorkShop Part3 - 实践基础设施即代码

在 `/cloudformation/stack.yaml` 查看现有代码。

### Step 1: 认识 CloudFormation 模版

一般情况下以 YAML 编写的 CloudFormation Template 的主体格式如下：

```yaml
AWSTemplateFormatVersion: "2010-09-09"
Description: ...
Parameters: ...
Resources: ...
Outputs: ...
```

这个模版只列出了常用的字段，参考链接：

- [主体结构 - Template](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/template-anatomy.html)
- [参数结构 - Parameters](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/parameters-section-structure.html)
- [资源结构 - Resources](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/resources-section-structure.html)
- [输出结构 - Outputs](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/outputs-section-structure.html)

一个[完整的示例](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/template-formats.html)：

```yaml
AWSTemplateFormatVersion: "2010-09-09"
Description: A sample template
Resources:
  MyEC2Instance: #An inline comment
    Type: "AWS::EC2::Instance"
    Properties:
      ImageId: "ami-0ff8a91507f77f867" #Another comment -- This is a Linux AMI
      InstanceType: t2.micro
      KeyName: testkey
      BlockDeviceMappings:
        - DeviceName: /dev/sdm
          Ebs:
            VolumeType: io1
            Iops: 200
            DeleteOnTermination: false
            VolumeSize: 20
```

### Step 2: 填充模版片段创建资源

我们将要创建一个模版，对应 Part 2 中手动创建的资源：

- 一个 EC2 Instance 服务器 - [AWS::EC2::Instance](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-ec2-instance.html)
  - `ImageId`
  - `InstanceType` 请使用 `t2.micro`
  - `KeyName`
  - `SecurityGroups`
- 一个 Route53 DNS 记录 - [AWS::Route53::RecordSet](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-route53-recordset.html)
  - `HostedZoneId`
  - `Name`
  - `Type` 请使用 `A`
  - `TTL` 请使用 `60`
  - `ResourceRecords`

输出：

- `InstanceId` - EC2 Instance Id
- `PublicIP` - EC2 Instance Public IP Address
- `PrivateIP` - EC2 Instance Private IP Address
- `DomainName` - Fully Qualified Domain Name

使用[这个命令](https://awscli.amazonaws.com/v2/documentation/api/latest/reference/cloudformation/validate-template.html)验证 CloudFormation Template：

```shell
aws cloudformation validate-template --template-body file://cloudformation/stack.yaml --output yaml --no-cli-pager
```

### Step 3: 与 Pipeline 集成

创建 Stack：

```shell
aws cloudformation create-stack --stack-name devops-girls-<> --template-body file://cloudformation/stack.yaml --parameters ParameterKey=SecurityGroupName,ParameterValue=<> ParameterKey=KeyName,ParameterValue=<> ParameterKey=HostedZoneId,ParameterValue=<> ParameterKey=DomainName,ParameterValue=<> --no-cli-pager
```

获取 Stack 信息：

```shell
aws cloudformation describe-stacks --stack-name devops-girls-<> --query 'Stacks[0].Outputs' --no-cli-pager
```

更新 Stack：

```shell
aws cloudformation update-stack --stack-name devops-girls-<> --template-body file://cloudformation/stack.yaml ...
```

删除 Stack：

```shell
aws cloudformation delete-stack --stack-name devops-girls-<>
```

与 GitHub Actions 集成：

```yaml

```
