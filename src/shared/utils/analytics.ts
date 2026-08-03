// Analytics Helper for Google Analytics 4 (GA4) eCommerce Events via GTM

type GA4Item = {
  item_id: string;
  item_name: string;
  affiliation?: string;
  coupon?: string;
  currency?: string;
  discount?: number;
  index?: number;
  item_brand?: string;
  item_category?: string;
  item_category2?: string;
  item_category3?: string;
  item_category4?: string;
  item_category5?: string;
  item_list_id?: string;
  item_list_name?: string;
  item_variant?: string;
  location_id?: string;
  price?: number;
  quantity?: number;
};

// Helper to safely push to dataLayer
const pushToDataLayer = (data: any) => {
  if (typeof window !== 'undefined') {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ ecommerce: null }); // Clear previous ecommerce object to prevent edge cases
    window.dataLayer.push(data);
  }
};

export const trackViewItemList = (items: any[], listName: string = 'Shop Page') => {
  pushToDataLayer({
    event: 'view_item_list',
    ecommerce: {
      item_list_id: listName.toLowerCase().replace(/\s+/g, '_'),
      item_list_name: listName,
      items: items.map((item, index) => ({
        item_id: item.id,
        item_name: item.name,
        item_category: item.category,
        price: item.price,
        index: index + 1
      }))
    }
  });
};

export const trackSelectItem = (item: any, listName: string = 'Shop Page', index: number = 1) => {
  pushToDataLayer({
    event: 'select_item',
    ecommerce: {
      item_list_id: listName.toLowerCase().replace(/\s+/g, '_'),
      item_list_name: listName,
      items: [{
        item_id: item.id,
        item_name: item.name,
        item_category: item.category,
        price: item.price,
        index
      }]
    }
  });
};

export const trackViewItem = (item: any) => {
  pushToDataLayer({
    event: 'view_item',
    ecommerce: {
      currency: 'NOK',
      value: item.price,
      items: [{
        item_id: item.id,
        item_name: item.name,
        item_category: item.category,
        price: item.price,
        quantity: 1
      }]
    }
  });
};

export const trackAddToCart = (item: any, quantity: number = 1) => {
  pushToDataLayer({
    event: 'add_to_cart',
    ecommerce: {
      currency: 'NOK',
      value: item.price * quantity,
      items: [{
        item_id: item.id,
        item_name: item.name,
        item_category: item.category,
        price: item.price,
        quantity
      }]
    }
  });
};

export const trackRemoveFromCart = (item: any) => {
  pushToDataLayer({
    event: 'remove_from_cart',
    ecommerce: {
      currency: 'NOK',
      value: item.price * item.quantity,
      items: [{
        item_id: item.id,
        item_name: item.name,
        item_category: item.category,
        price: item.price,
        quantity: item.quantity
      }]
    }
  });
};

export const trackBeginCheckout = (cartItems: any[], totalValue: number) => {
  pushToDataLayer({
    event: 'begin_checkout',
    ecommerce: {
      currency: 'NOK',
      value: totalValue,
      items: cartItems.map((item) => ({
        item_id: item.id,
        item_name: item.name,
        price: item.price,
        quantity: item.quantity
      }))
    }
  });
};

export const trackPurchase = (transactionId: string, cartItems: any[], totalValue: number, shippingCost: number = 0) => {
  pushToDataLayer({
    event: 'purchase',
    ecommerce: {
      transaction_id: transactionId,
      value: totalValue,
      tax: 0,
      shipping: shippingCost,
      currency: 'NOK',
      items: cartItems.map((item) => ({
        item_id: item.id,
        item_name: item.name,
        price: item.price,
        quantity: item.quantity
      }))
    }
  });
};

// Types for window
declare global {
  interface Window {
    dataLayer: any[];
  }
}
