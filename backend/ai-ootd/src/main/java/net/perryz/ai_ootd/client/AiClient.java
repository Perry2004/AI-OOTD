package net.perryz.ai_ootd.client;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import com.openai.client.OpenAIClient;
import com.openai.client.okhttp.OpenAIOkHttpClient;
import com.openai.models.chat.completions.ChatCompletionCreateParams;

@Component
public class AiClient {
    private OpenAIClient aiClient;
    private final String OPEN_ROUTER_BASE_URL = "https://openrouter.ai/api/v1";
    private final String DEFAULT_MODEL = "mistralai/mistral-small-3.2-24b-instruct:free";

    public AiClient(@Value("${OPEN_ROUTER_API_KEY}") final String OPEN_ROUTER_API_KEY) {
        System.out.println("API key: " + OPEN_ROUTER_API_KEY + " Base URL: " + OPEN_ROUTER_BASE_URL);
        aiClient = OpenAIOkHttpClient.builder()
                .apiKey(OPEN_ROUTER_API_KEY)
                .baseUrl(OPEN_ROUTER_BASE_URL)
                .build();
    }

    public String invokeAi(String prompt) {
        try {
            ChatCompletionCreateParams createParams = ChatCompletionCreateParams.builder()
                    .model(DEFAULT_MODEL)
                    .addUserMessage(prompt)
                    .build();

            var chatCompletion = aiClient.chat().completions().create(createParams);

            // Check if choices are available before accessing them
            if (chatCompletion.choices() == null || chatCompletion.choices().isEmpty()) {
                System.err.println("No choices returned from AI API");
                return "Error: No response received from AI service";
            }

            String response = chatCompletion.choices().get(0).message().content().get();
            return "Response: " + response;
        } catch (Exception e) {
            System.err.println("Error calling AI API: " + e.getMessage());
            e.printStackTrace();
            return "Error: Failed to get response from AI service - " + e.getMessage();
        }
    }
}
