### Create Server Cluster

  1. Install node.js 6 or 8, Terraform, Packer, and OpenSSH.

  2. Install Baresoil and the AWS Baresoil provider.

         npm install -g baresoil@latest baresoil-provider-aws@latest benchoid@latest

  3. Interactively configure AWS credentials and cluster parameters. In this directory, run:

         cd server
         baresoil-server configure -p aws

  4. Raise cluster

         baresoil-server raise-cluster

  5. Build image

         baresoil-server build-image

  6. Deploy image

         baresoil-server deploy-image

  7. Follow instructions for deploying the Baresoil project in the `project/` directory.

### Create Test Cluster

  1. Install Benchoid

         npm install -g benchoid@latest

  2. Create a test cluster and set it up for use

         benchoid create-cluster
         benchoid setup-cluster


### Run Experiment

  1. Sync the test agent code to the cluster (Note: you must edit agent.js to point to the DNS name of your server cluster).

         cd agent
         benchoid sync

  2. Interactively configure and then run the experiment

         benchoid run

  3. Run the raw data analysis scripts

         benchoid analyze

  4. Create the experiment report

         benchoid render


### Cleanup

  1. Destroy the test cluster

         cd terraform
         terraform destroy

  2. Destroy the server cluster

         cd server
         baresoil-server teardown-cluster
