/*
    Module: @mitchallen/react-s3-connect
    Author: Mitch Allen
*/

// import authUser from "@mitchallen/react-cognito-auth-user";

export default async function S3Connect( params ) {

    let { AWS, authUser, file, bucket, ...rest } = params;
    
    let awsConfig = AWS.config;

    if (!await authUser( { awsConfig, ...rest } )) {
        throw new Error("User is not logged in");
    }
    
    return new AWS.S3({
        params: {
          Bucket: bucket
        }
    });
}