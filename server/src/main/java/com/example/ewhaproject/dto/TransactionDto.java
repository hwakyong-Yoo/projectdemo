package com.example.ewhaproject.dto;

import com.example.ewhaproject.entity.Transaction;
import lombok.*;

@Data
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TransactionDto {
    private Long transaction_id;
    private String userId;
    private long postId;
    private String amount;
    private String size;

    public static TransactionDto createdTransactionDto(Transaction createdTransaction) {
        return TransactionDto.builder()
                .transaction_id(createdTransaction.getTransaction_id())
                .userId(createdTransaction.getUserId())
                .postId(createdTransaction.getPostId())
                .amount(createdTransaction.getAmount())
                .size(createdTransaction.getSize())
                .build();
    }

    public Transaction toEntity() {
        return new Transaction (transaction_id, userId, postId, amount, size);
    }
}

