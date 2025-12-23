package com.omnisettle.ai.service;

import org.springframework.grpc.server.service.GrpcService;

import com.omnisettle.ai.grpc.*;
import io.grpc.stub.StreamObserver;

@GrpcService
public class ComplianceServiceImpl extends ComplianceServiceGrpc.ComplianceServiceImplBase {

    @Override
    public void validateTransaction(TransactionRequest request, StreamObserver<ValidationResponse> responseObserver) {

        // This is where Gemini 2.0 will eventually live.
        // For now, let's mock the "Principal" logic.

        System.out.println("Received validation request for: " + request.getTransactionId());

        String status = "APPROVED";
        String reasoning = "Mocked AI: Transaction aligns with " + request.getDestinationCountry() + " regulations.";
        double tax = request.getAmount() * 0.20; // Default 20% mock tax

        // Build the response
        ValidationResponse response = ValidationResponse.newBuilder()
                .setIsCompliant(true)
                .setComplianceStatus(status)
                .setAiReasoning(reasoning)
                .setCalculatedTax(tax)
                .build();

        // Send back to .NET
        responseObserver.onNext(response);
        responseObserver.onCompleted();
    }
}