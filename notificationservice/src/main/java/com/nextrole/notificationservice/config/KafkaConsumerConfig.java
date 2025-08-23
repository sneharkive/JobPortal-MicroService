package com.nextrole.notificationservice.config;


import org.apache.kafka.common.serialization.StringDeserializer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.annotation.EnableKafka;
import org.springframework.kafka.config.ConcurrentKafkaListenerContainerFactory;
import org.springframework.kafka.core.ConsumerFactory;
import org.springframework.kafka.core.DefaultKafkaConsumerFactory;
import org.springframework.kafka.support.serializer.JsonDeserializer;

import com.nextrole.common_dto.kafka.AuthOtpEvent;
import com.nextrole.common_dto.kafka.UserChangePassEvent;
import com.nextrole.common_dto.kafka.UserCreatedEvent;
import com.nextrole.common_dto.kafka.UserDeletedEvent;
import com.nextrole.common_dto.kafka.UserLogInEvent;

import java.util.HashMap;
import java.util.Map;

@Configuration
@EnableKafka
public class KafkaConsumerConfig {

    private Map<String, Object> baseConsumerConfig() {
        Map<String, Object> props = new HashMap<>();
        props.put(org.apache.kafka.clients.consumer.ConsumerConfig.BOOTSTRAP_SERVERS_CONFIG, "localhost:9092");
        props.put(org.apache.kafka.clients.consumer.ConsumerConfig.GROUP_ID_CONFIG, "notification-group");
        props.put(org.apache.kafka.clients.consumer.ConsumerConfig.KEY_DESERIALIZER_CLASS_CONFIG, StringDeserializer.class);
        return props;
    }

    private <T> ConsumerFactory<String, T> consumerFactory(Class<T> type) {
        JsonDeserializer<T> deserializer = new JsonDeserializer<>(type);
        deserializer.addTrustedPackages("com.nextrole.common_dto.kafka");
        return new DefaultKafkaConsumerFactory<>(baseConsumerConfig(), new StringDeserializer(), deserializer);
    }

    private <T> ConcurrentKafkaListenerContainerFactory<String, T> factory(Class<T> type) {
        ConcurrentKafkaListenerContainerFactory<String, T> factory = new ConcurrentKafkaListenerContainerFactory<>();
        factory.setConsumerFactory(consumerFactory(type));
        return factory;
    }

    @Bean
    public ConcurrentKafkaListenerContainerFactory<String, UserCreatedEvent> userCreatedKafkaListenerContainerFactory() {
        return factory(UserCreatedEvent.class);
    }

    @Bean
    public ConcurrentKafkaListenerContainerFactory<String, UserDeletedEvent> userDeletedKafkaListenerContainerFactory() {
        return factory(UserDeletedEvent.class);
    }

    @Bean
    public ConcurrentKafkaListenerContainerFactory<String, UserChangePassEvent> userChangePassKafkaListenerContainerFactory() {
        return factory(UserChangePassEvent.class);
    }

    @Bean
    public ConcurrentKafkaListenerContainerFactory<String, UserLogInEvent> userLoginKafkaListenerContainerFactory() {
        return factory(UserLogInEvent.class);
    }

    @Bean
    public ConcurrentKafkaListenerContainerFactory<String, AuthOtpEvent> authOTPKafkaListenerContainerFactory() {
        return factory(AuthOtpEvent.class);
    }
}
