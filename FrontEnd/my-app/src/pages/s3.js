import aws from 'aws-sdk'
import crypto from 'crypto'
import {promisify} from 'util'

const randomBytes = promisify(crypto.randomBytes)

const region = "ap-southeast-1"
const bucketName = "bababook-bucket"
const accessKeyId = "AKIAVNJTT3XD4QZOZIUH"
const secretAccessKey = "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"

const s3 = new aws.S3({
    region,
    accessKeyId,
    secretAccessKey,
    signatureVersion : 'v4'

})

export const generateUploadURL = async() =>{
    const rawBytes = await randomBytes(16)
    const imageName = rawBytes.toString('hex')

    const params = ({

        Bucket : bucketName,
        Key : imageName,
        Expires: 120

    })


    const uploadURL = await s3.getSignedUrlPromise('putObject', params)
    return uploadURL

}