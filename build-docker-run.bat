docker rm -f calc1
call build-InterestCalc.bat
docker build -f Dockerfile dist -t calc
docker run -d -p 8080:80 --name calc1 calc