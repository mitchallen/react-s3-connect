@mitchallen/react-s3-connect
==
S3 Connect 
--

<p align="left">
  <a href="https://circleci.com/gh/mitchallen/react-s3-connect">
    <img src="https://img.shields.io/circleci/project/github/mitchallen/react-s3-connect.svg" alt="Continuous Integration">
  </a>
  <a href="https://codecov.io/gh/mitchallen/react-s3-connect">
    <img src="https://codecov.io/gh/mitchallen/react-s3-connect/branch/master/graph/badge.svg" alt="Coverage Status">
  </a>
  <a href="https://npmjs.org/package/@mitchallen/react-s3-connect">
    <img src="http://img.shields.io/npm/dt/@mitchallen/react-s3-connect.svg?style=flat-square" alt="Downloads">
  </a>
  <a href="https://npmjs.org/package/@mitchallen/react-s3-connect">
    <img src="http://img.shields.io/npm/v/@mitchallen/react-s3-connect.svg?style=flat-square" alt="Version">
  </a>
  <a href="https://npmjs.com/package/@mitchallen/react-s3-connect">
    <img src="https://img.shields.io/github/license/mitchallen/react-s3-connect.svg" alt="License"></a>
  </a>
</p>

## Installation

    $ npm init
    $ npm install @mitchallen/react-s3-connect --save
  
* * *

## Usage

In this example use S3Connect to get a file from S3.

__NOTE:__ it is *important* that you put the __await__ statement before the S3Connect call.

```
import S3Connect from '@mitchallen/react-s3-connect';

export default async function s3GetTextFile( params ) {

    const s3 = await S3Connect( params );

    let { file, bucket } = params;
          
    return s3.getObject({
        Bucket: bucket,
        Key: file
    })
    .promise()
    .then( (data) => data.Body.toString('utf-8') );
}
```

Below is an example of how to call the method above.

__NOTE:__ it is important that you only have one instance of __authUser__ in your app.

See: [@mitchallen/react-cognito-auth-user](https://www.npmjs.com/package/@mitchallen/react-cognito-auth-user)


```
import AWS from "aws-sdk";
import authUser from "@mitchallen/react-cognito-auth-user";
const testFile = 'cognito/private/demo.txt';

s3GetTextFile({ 
    AWS: AWS,
    authUser: authUser,
    bucket: BUCKET,
    file: testFile, 
    userPoolId: COGNITO_USER_POOL_ID,
    clientId: COGNITO_APP_CLIENT_ID,
    region: COGNITO_REGION, 
    identyPoolId: COGNITO_IDENTITY_POOL_ID
})
.then((data) => {
    alert(data);
})
.catch(function(err) {
    alert(err);
});
```

* * *

## Example Cognito Bucket Policy

This is an example of how to restrict an S3 bucket to users from a Cognito pool.

Edit for your account #, Cognito roles and operations that you plan to support.

```
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Principal": {
                "AWS": "arn:aws:iam::123456789012:role/Cognito_YOURidentitypoolAuth_Role"
            },
            "Action": "s3:ListBucket",
            "Resource": "arn:aws:s3:::my-bucket",
            "Condition": {
                "StringLike": {
                    "s3:prefix": "cognito/private/"
                }
            }
        },
        {
            "Effect": "Allow",
            "Principal": {
                "AWS": "arn:aws:iam::123456789012:role/Cognito_YOURidentitypoolAuth_Role"
            },
            "Action": "s3:GetObject",
            "Resource": [
                "arn:aws:s3:::my-bucket/cognito/private",
                "arn:aws:s3:::my-bucket/cognito/private/*"
            ]
        }
    ]
}
```

* * *

 
## Repo(s)

* [bitbucket.org/mitchallen/react-s3-connect.git](https://bitbucket.org/mitchallen/react-s3-connect.git)
* [github.com/mitchallen/react-s3-connect.git](https://github.com/mitchallen/react-s3-connect.git)

* * *

## Contributing

In lieu of a formal style guide, take care to maintain the existing coding style.
Add unit tests for any new or changed functionality. Lint and test your code.

* * *

## Version History

#### Version 0.2.0

* Now passes AWS to authUser

#### Version 0.1.0 

* initial release

* * *