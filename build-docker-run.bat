docker rm -f calc1
REM do not need to build locally because of 2 stage build
REM call build-InterestCalc.bat
docker build -f DockerfileBuild . -t calc
docker run -d -p 8080:80 --name calc1 calc