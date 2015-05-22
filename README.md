# Satic website for has.concord.org

This repository is the home for has.concord.org. Follow these directions to deploy This
site to the correct S3 bucket, and deploy.

## Requirements

1. The [s3_website gem](https://github.com/laurilehmijoki/s3_website): `gem install s3_website`

## Developing

These are simplified instructions for now. Actual workflow TBD

1. edit files inside `_site`
2. run a local webserver: `cd _site && python -c 'import SimpleHTTPServer; SimpleHTTPServer.test()'`
3. Make sure your changes look good.
4. Add your changes: `git add *``
5. Commit your changes: `git commit -m 'updated website'`
6. Push your changes `git push origin master`


## Deploying

1. Make sure you have the s3_website gem installed. `gem install s3_website`
2. Export your AWS credentials:
    export S3_ID=xxxx
    export S3_SECRET=xxxxx
3. Push the changes to the bucket  `s3_website push`

## Changing configuration

If you need to make changes to this website, you can read the instructions for
the s3_website gem and tools, and then:

1. Edit the file `s3_website.yml`
2. run `s3_website cfg apply` to push your config changes up.
3. run `s3_website push` to be sure things are working.
