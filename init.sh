


git clone "https://github.com/DylanGrahamHart/sample-veritone-client"
git clone "https://github.com/DylanGrahamHart/sample-veritone-server"

cd sample-veritone-client
npm install
npm run build

docker run --name some-postgres -e POSTGRES_PASSWORD=mysecretpassword -v postgres-data:/var/lib/postgresql -p 5432:5432 -d postgres


cd ../sample-veritone-server
npm install
npm run init
npm run start
