package config;

import org.socialsignin.spring.data.dynamodb.repository.config.EnableDynamoDBRepositories;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;

import com.amazonaws.auth.AWSSessionCredentials;
import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicSessionCredentials;
import com.amazonaws.services.dynamodbv2.AmazonDynamoDB;
import com.amazonaws.services.dynamodbv2.AmazonDynamoDBClientBuilder;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapper;

@Configuration
@ConfigurationProperties(prefix = "amazon.aws")
@EnableDynamoDBRepositories(basePackages = "jorge.sofia")
public class ConfiguracionPropiedades {
	
	private String accesskey;
	private String secretkey;
	private String region;
	private String endpoint;
	private String sessiontoken;
	
	public String getAccessKey() {
		return accesskey;
	}
	public void setAccessKey(String accesskey) {
		this.accesskey = accesskey;
	}
	public String getSecretKey() {
		return secretkey;
	}
	public void setSecretKey(String secretkey) {
		this.secretkey = secretkey;
	}
	public String getRegion() {
		return region;
	}
	public void setRegion(String region) {
		this.region = region;
	}
	
	public String getEndpoint() {
		return endpoint;
	}
	public void setEndpoint(String endpoint) {
		this.endpoint = endpoint;
	}	
	public String getSessiontoken() {
		return sessiontoken;
	}
	public void setSessiontoken(String sessiontoken) {
		this.sessiontoken = sessiontoken;
	}
	
	@Bean
    AmazonDynamoDB amazonDynamoDB() {
		AWSSessionCredentials  credenciales = new BasicSessionCredentials(accesskey, secretkey, sessiontoken);
        return AmazonDynamoDBClientBuilder.standard().withRegion(region).withCredentials(new AWSStaticCredentialsProvider(credenciales)).build();
    }

    @Bean
    @Primary
    DynamoDBMapper dynamoDBMapper(AmazonDynamoDB amazonDynamoDB) {
        return new DynamoDBMapper(amazonDynamoDB);
    }
}
