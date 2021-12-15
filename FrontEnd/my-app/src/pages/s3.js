import aws from 'aws-sdk'
import crypto from 'crypto'
import {promisify} from 'util'

const randomBytes = promisify(crypto.randomBytes)

const region = "ap-southeast-1"
const bucketName = "bababook-bucket"
// const accessKeyId = process.env.REACT_APP_ACCESS_KEY
// const secretAccessKey = process.env.REACT_APP_SECRET_KEY

const accessKeyId = "AKIAVNJTT3XDVXHH2HH5"
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
        Expires: 120,

    })

    const uploadURL = await s3.getSignedUrlPromise('putObject', params)
    return uploadURL

}