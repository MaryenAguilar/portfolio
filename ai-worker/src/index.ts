export interface Env {
  AI: any;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const corsHeaders = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    };

    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders });
    }

    try {
      const body: any = await request.json();
      const prompt = body.prompt || "Hola";
      
      const currentLanguage = body.lang === "en" ? "English" : "Spanish";

      const answer = await env.AI.run('@cf/meta/llama-3-8b-instruct', {
        messages: [
          { 
            role: 'system', 
            content: `You are Maryen Aguilar's AI Assistant. 
                      IMPORTANT: You must respond ALWAYS in ${currentLanguage}.
                      
                      CONTEXT ABOUT MARYEN:
                      - She is a Front-End Developer.
                      - Tech stack: React, TypeScript, Tailwind CSS, Cloudflare.
                      - Personality: Professional, helpful, and creative.
                      
                      If the user speaks in a language different than ${currentLanguage}, 
                      briefly answer and then continue only in ${currentLanguage}.` 
          },
          { role: 'user', content: prompt }
        ]
      });

      return new Response(JSON.stringify(answer), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });

    } catch (error: any) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: corsHeaders,
      });
    }
  },
};