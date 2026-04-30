import Hotel from '../models/Hotel.js';

const toClientHotel = (doc) => ({
  id: doc._id.toString(),
  name: doc.name,
  address: doc.address,
  email: doc.email,
  phone: doc.phone,
  price: doc.priceLabel,
  image: doc.image
});

export const listHotels = async (req, res) => {
  try {
    const docs = await Hotel.find().sort({ createdAt: -1 }).lean();
    res.json({ hotels: docs.map((d) => toClientHotel(d)) });
  } catch (err) {
    res.status(500).json({ msg: 'Erreur serveur', error: err.message });
  }
};

export const createHotel = async (req, res) => {
  try {
    const { name, address, email, phone, priceLabel, image } = req.body;

    if (!name?.trim() || !address?.trim() || !email?.trim() || !phone?.trim()) {
      return res.status(400).json({ msg: 'Nom, adresse, e-mail et téléphone requis' });
    }

    if (!priceLabel?.trim()) {
      return res.status(400).json({ msg: 'Prix requis' });
    }

    if (!image?.trim()) {
      return res.status(400).json({ msg: 'Image requise (URL ou fichier)' });
    }

    const hotel = await Hotel.create({
      name: name.trim(),
      address: address.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      priceLabel: priceLabel.trim(),
      image: image.trim()
    });

    res.status(201).json({ msg: 'Hôtel créé', hotel: toClientHotel(hotel) });
  } catch (err) {
    res.status(500).json({ msg: 'Erreur serveur', error: err.message });
  }
};

export const updateHotel = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, address, email, phone, priceLabel, image } = req.body;

    if (!name?.trim() || !address?.trim() || !email?.trim() || !phone?.trim()) {
      return res.status(400).json({ msg: 'Nom, adresse, e-mail et téléphone requis' });
    }

    if (!priceLabel?.trim()) {
      return res.status(400).json({ msg: 'Prix requis' });
    }

    if (!image?.trim()) {
      return res.status(400).json({ msg: 'Image requise (URL ou fichier)' });
    }

    const hotel = await Hotel.findByIdAndUpdate(
      id,
      {
        name: name.trim(),
        address: address.trim(),
        email: email.trim().toLowerCase(),
        phone: phone.trim(),
        priceLabel: priceLabel.trim(),
        image: image.trim()
      },
      { new: true, runValidators: true }
    );

    if (!hotel) {
      return res.status(404).json({ msg: 'Hôtel non trouvé' });
    }

    res.json({ msg: 'Hôtel mis à jour', hotel: toClientHotel(hotel) });
  } catch (err) {
    res.status(500).json({ msg: 'Erreur serveur', error: err.message });
  }
};

export const deleteHotel = async (req, res) => {
  try {
    const { id } = req.params;

    const hotel = await Hotel.findByIdAndDelete(id);

    if (!hotel) {
      return res.status(404).json({ msg: 'Hôtel non trouvé' });
    }

    res.json({ msg: 'Hôtel supprimé' });
  } catch (err) {
    res.status(500).json({ msg: 'Erreur serveur', error: err.message });
  }
};
