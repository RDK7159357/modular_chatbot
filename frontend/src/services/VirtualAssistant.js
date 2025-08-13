// src/services/VirtualAssistant.js
import axios from 'axios';

class VirtualAssistant {
  constructor(apiUrl, websiteId) {
    this.apiUrl = apiUrl;
    this.websiteId = websiteId;
    this.navigationCommands = this.initializeNavigationCommands();
  }

  initializeNavigationCommands() {
    return {
      home: {
        keywords: ['home', 'main', 'homepage', 'start', 'beginning', 'dashboard'],
        route: '/',
        description: 'Navigate to home page'
      },
      admissions: {
        keywords: ['admission', 'admissions', 'apply', 'application', 'enroll', 'enrollment', 'join', 'entry'],
        route: '/admissions',
        description: 'Navigate to admissions information'
      },
      academics: {
        keywords: ['academics', 'academic', 'courses', 'programs', 'syllabus', 'curriculum', 'study', 'departments'],
        route: '/academics',
        description: 'Navigate to academic programs'
      },
      faculty: {
        keywords: ['faculty', 'teachers', 'professors', 'staff', 'instructor', 'educator'],
        route: '/faculty',
        description: 'Navigate to faculty directory'
      },
      services: {
        keywords: ['services', 'service', 'facilities', 'amenities', 'support', 'help', 'library', 'hostel'],
        route: '/services',
        description: 'Navigate to student services'
      }
    };
  }

  // Analyze user input to detect navigation intent
  analyzeNavigationIntent(userInput) {
    const input = userInput.toLowerCase();
    
    // Check for explicit navigation commands
    const navigationPatterns = [
      /(?:go to|navigate to|show me|take me to|open|visit)\s+(.+)/,
      /(?:i want to see|show|display)\s+(.+)/,
      /(?:where is|find)\s+(.+)/,
      /(.+)(?:\s+page|\s+section|\s+info|\s+information)/
    ];

    for (const pattern of navigationPatterns) {
      const match = input.match(pattern);
      if (match) {
        const target = match[1].trim();
        const route = this.findMatchingRoute(target);
        if (route) {
          return {
            isNavigation: true,
            route: route.route,
            section: route.section,
            confidence: 0.9
          };
        }
      }
    }

    // Check for direct keyword matches
    const route = this.findMatchingRoute(input);
    if (route) {
      return {
        isNavigation: true,
        route: route.route,
        section: route.section,
        confidence: 0.7
      };
    }

    return {
      isNavigation: false,
      confidence: 0
    };
  }

  findMatchingRoute(input) {
    const words = input.toLowerCase().split(/\s+/);
    
    for (const [section, config] of Object.entries(this.navigationCommands)) {
      for (const keyword of config.keywords) {
        if (words.includes(keyword) || input.includes(keyword)) {
          return {
            route: config.route,
            section: section,
            description: config.description
          };
        }
      }
    }
    return null;
  }

  // Enhanced chat function that handles both Q&A and navigation
  async processUserInput(userInput, navigate) {
    const navigationIntent = this.analyzeNavigationIntent(userInput);
    
    if (navigationIntent.isNavigation && navigationIntent.confidence > 0.6) {
      // Handle navigation
      navigate(navigationIntent.route);
      
      return {
        type: 'navigation',
        message: `Navigating to ${navigationIntent.section}...`,
        route: navigationIntent.route,
        isNavigation: true
      };
    } else {
      // Handle regular chat
      try {
        const response = await axios.post(this.apiUrl, {
          question: userInput,
          website_id: this.websiteId
        });

        // Check if the response suggests navigation
        const responseNavigation = this.analyzeNavigationIntent(response.data.answer);
        if (responseNavigation.isNavigation) {
          return {
            type: 'chat_with_navigation',
            message: response.data.answer,
            suggestedRoute: responseNavigation.route,
            isNavigation: false,
            hasSuggestion: true
          };
        }

        return {
          type: 'chat',
          message: response.data.answer,
          isNavigation: false
        };
      } catch (error) {
        console.error("Error fetching response:", error);
        return {
          type: 'error',
          message: 'Sorry, something went wrong.',
          isNavigation: false
        };
      }
    }
  }

  // Get quick actions based on current context
  getQuickActions(currentRoute) {
    const suggestions = [];
    
    for (const [section, config] of Object.entries(this.navigationCommands)) {
      if (config.route !== currentRoute) {
        suggestions.push({
          label: `Go to ${section.charAt(0).toUpperCase() + section.slice(1)}`,
          command: `show me ${section}`,
          route: config.route
        });
      }
    }
    
    return suggestions.slice(0, 3); // Return top 3 suggestions
  }

  // Generate contextual suggestions based on user query
  generateSuggestions(userInput) {
    const input = userInput.toLowerCase();
    const suggestions = [];

    // Context-aware suggestions
    if (input.includes('course') || input.includes('program') || input.includes('study')) {
      suggestions.push('Show me academic programs');
    }
    
    if (input.includes('apply') || input.includes('admission')) {
      suggestions.push('Take me to admissions');
    }
    
    if (input.includes('teacher') || input.includes('professor')) {
      suggestions.push('Show me faculty directory');
    }
    
    if (input.includes('facility') || input.includes('service')) {
      suggestions.push('Show me student services');
    }

    return suggestions;
  }
}

export default VirtualAssistant;
