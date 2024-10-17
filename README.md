# archive-lambdas

It's a script that archives Lambda functions, which can be helpful if you're cleaning house but don't want to completely burn everything down. For instance, I've found it helpful to back old functions up to S3 before deleting them.

## Usage

```sh
export AWS_ACCESS_KEY_ID="AAAAAAAAAAAAAAAAAAAA"
export AWS_SECRET_ACCESS_KEY="+AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"
export AWS_SESSION_TOKEN="AAAAAAAAAAAAAAAAAAA//////////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA+AAAAAAAAAAAA+"
export AWS_REGION='us-east-1' # or whatever

cat <<EOF > config/lambdas.json
[
  "Foo",
  "Bar",
  "Baz"
]
EOF

npm start
```