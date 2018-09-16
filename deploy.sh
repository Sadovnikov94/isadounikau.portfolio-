echo 'Deploy start';
ssh root@isadovnikov.info rm -r /var/lib/tomcat8/webapps/ROOT/*;
scp -r . root@isadovnikov.info:/var/lib/tomcat8/webapps/ROOT/;
echo 'Deploy end';