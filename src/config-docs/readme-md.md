docker build -t pagemaker-v3/pagemaker-app .

docker run -it -p 8082:80 --rm --name pagemaker-v3-app pagemaker-v3/pagemaker-app

Jenkins running on local host 6100