/*
    Module: @mitchallen/react-s3-connect
    Author: Mitch Allen
*/

export default async function S3Connect( params ) {

    let { AWS, authUser, bucket, ...rest } = params;
    
    if (!await authUser( { AWS, ...rest } )) {
        throw new Error("User is not logged in");
    }
    
    return new AWS.S3({
        params: {
          Bucket: bucket
        }
    });
}