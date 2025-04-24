async function processStreamingResponse(stream) {
    let fullResponse = '';
    let citations = [];
    try {
        // Process the streaming response
        for await (const chunk of stream) {
            // For Chat Completions API
            if (chunk.choices && chunk.choices[0]?.delta?.content) {
                fullResponse += chunk.choices[0].delta.content;
                // Check for citations in the final chunk
                if (chunk.choices[0]?.finish_reason === 'stop' && chunk.choices[0]?.citations) {
                    citations = chunk.choices[0].citations;
                }
            }
            // For Responses API
            if (chunk.type === 'response.output_text.delta') {
                fullResponse += chunk.text?.delta || '';
            }
        }
        return fullResponse;
    }
    catch (error) {
        console.error('Error processing streaming response:', error);
        throw error;
    }
}
export { processStreamingResponse };
