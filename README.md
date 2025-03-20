# Lone Mountain Homes

A modern real estate website featuring powerful market analysis tools and property search capabilities.

## Features

- Interactive property search with RealScout integration
- Home valuation tools powered by Homebot
- Comprehensive market analysis using CloudCMA
- Neighborhood insights with Percy.ai
- Mobile-responsive design
- Modern UI with Tailwind CSS

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy the environment file template:
   ```bash
   cp .env.example .env.local
   ```
4. Configure your API keys in `.env.local`:
   - RealScout API credentials
   - Homebot API credentials
   - CloudCMA API key
   - Percy.ai API key

5. Run the development server:
   ```bash
   npm run dev
   ```

## Widget Configuration

### RealScout
1. Sign up for a RealScout account
2. Obtain your API key and Account ID from the dashboard
3. Add them to your `.env.local` file

### Homebot
1. Create a Homebot account
2. Get your API credentials from the integration settings
3. Configure them in `.env.local`

### CloudCMA
1. Register for a CloudCMA account
2. Generate an API key from your account settings
3. Add it to `.env.local`

### Percy.ai
1. Sign up for Percy.ai
2. Get your API key from the dashboard
3. Configure it in `.env.local`

## Development

- Built with Next.js 14
- Styled with Tailwind CSS
- TypeScript for type safety
- Environment variables for secure configuration

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
