package com.omnisettle.ai;

import org.springframework.boot.SpringApplication;

public class TestOmniSettleAiEngineApplication {

	public static void main(String[] args) {
		SpringApplication.from(OmniSettleAiEngineApplication::main).with(TestcontainersConfiguration.class).run(args);
	}

}
