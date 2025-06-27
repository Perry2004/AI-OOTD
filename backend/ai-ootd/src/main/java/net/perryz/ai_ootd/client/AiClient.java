package net.perryz.ai_ootd.client;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import com.openai.client.OpenAIClient;
import com.openai.client.okhttp.OpenAIOkHttpClient;
import com.openai.models.chat.completions.ChatCompletionCreateParams;

import java.time.Duration;
import lombok.extern.slf4j.Slf4j;
import net.perryz.ai_ootd.dto.GenerateJournalDto;

@Component
@Slf4j
public class AiClient {
    private OpenAIClient aiClient;
    private final String OPEN_ROUTER_BASE_URL = "https://openrouter.ai/api/v1";
    private final String DEFAULT_MODEL = "google/gemini-2.0-flash-exp:free";

    public AiClient(@Value("${OPEN_ROUTER_API_KEY}") final String OPEN_ROUTER_API_KEY) {
        System.out.println("API key: " + OPEN_ROUTER_API_KEY + " Base URL: " + OPEN_ROUTER_BASE_URL);
        aiClient = OpenAIOkHttpClient.builder()
                .apiKey(OPEN_ROUTER_API_KEY)
                .baseUrl(OPEN_ROUTER_BASE_URL)
                .timeout(Duration.ofSeconds(30))
                .build();
    }

    public String invokeAiWithImage(String prompt, String imageDataUrl) {
        try {
            ChatCompletionCreateParams createParams = ChatCompletionCreateParams.builder()
                    .model(DEFAULT_MODEL)
                    .addUserMessage(prompt)
                    .addUserMessage(imageDataUrl)
                    .build();

            var chatCompletion = aiClient.chat().completions().create(createParams);

            // Check if choices are available before accessing them
            log.info("Chat completion response: {}", chatCompletion);
            if (chatCompletion._additionalProperties().get("error") != null) {
                log.error("Error in AI API response: {}", chatCompletion._additionalProperties().get("error"));
                return "Error: " + chatCompletion._additionalProperties().get("error");
            }
            if (chatCompletion.choices() == null || chatCompletion.choices().isEmpty()) {
                log.error("No choices returned from AI API");
                return "Error: No response received from AI service";
            }

            String response = chatCompletion.choices().get(0).message().content().get();
            return "Response: " + response;
        } catch (Exception e) {
            log.error("Error calling AI API with image: {}", e.getMessage());
            e.printStackTrace();
            return "Error: Failed to get response from AI service with image - " + e.getMessage();
        }
    }

    public String generateJournal(GenerateJournalDto generateJournalDto) {
        log.info("Generating journal with DTO: {}", generateJournalDto);
        String imageDataUrl = generateJournalDto.getDataUrl();
        log.info("Image Data URL: {}", imageDataUrl);
        if (imageDataUrl == null || imageDataUrl.isEmpty()) {
            log.error("Image Data URL is null or empty");
            return "Error: Image Data URL is null or empty";
        }
        String prompt = composePrompt(generateJournalDto.interestingThing(), generateJournalDto.mood());
        log.info("Composed prompt: {}", prompt);
        return invokeAiWithImage(prompt, imageDataUrl);
    }

    private String composePrompt(String interestingThing, String mood) {
        String promptTemplate = """
                Today I have done: %s.
                Today I feel %s. Here's my Outfit of the Day.
                Generate a 50-70 words daily journal as a return.
                Act like myself writing it. No introduction needed.
                Use lots of emojis and ascii art.
                Use the image as a reference.
                Be as creative as you can.
                        """;
        return String.format(promptTemplate, interestingThing, mood);
    }
}
